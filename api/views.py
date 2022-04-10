from queue import Empty
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser
from .serializers import UpdateToolSerializer, ToolSerializer, CategorySerializer, AllToolSerializer, UserAccountInfoSerializer, UpdateUserAccountNameImageSerializer
from .models import Category, Tool, UserAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.paginator import Paginator

from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class CreateToolsAPIView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class ViewToolsAPIView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer


class CreateCategoryAPIView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ViewCategoriesAPIView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['name'] = user.name
        token['display_image'] = str(user.display_image)
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_staff

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register(request):
    user = User.objects.create_user(request.data.username, request.data.email, request.data.password1)
    if user.save():
        return Response("/", status=status.HTTP_201_CREATED)
    return Response({'Bad Request': 'Informations sent is not valid.'}, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def check_email_if_exists(request):
    user = UserAccount.objects.filter(email = request.data['email'])
    if not user: 
        return Response({'Email Not Exists': 'Email is not in the database.'}, status=status.HTTP_200_OK)
    else:
        print(user[0])
        return Response(UserAccountInfoSerializer(user[0]).data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


@api_view(['POST'])
def get_user_bookmarked_tools(request):
    user = UserAccount.objects.get(email = request.data['email'])
    queryset = user.bookmarked_tool.all()
    tools = []
    if queryset.exists():
        for tool in queryset.iterator():
            tools.append(AllToolSerializer(tool).data)

        return Response(tools, status=status.HTTP_200_OK)
    else:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def get_user_name_and_display_image(request):

    user = UserAccount.objects.get(email=request.data['email'])
    if not user: return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)

    return Response(UpdateUserAccountNameImageSerializer(user).data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def update_user_account_info(request):
    user_account = UserAccount.objects.get(email=request.data['email'])
    
    if not user_account: return Response({'Bad Request': 'Something went wrong validating account details. Please login again.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_account.name = request.data['name']
    user_account.display_image = request.data['display_image']
    user_account.save(update_fields=['name', 'display_image'])
    return Response({'Update Success': 'Updating UserAccount display and/or name successful.'}, status=status.HTTP_200_OK) 


@api_view(['GET'])
def get_all_tools(request):
    queryset = Tool.objects.all()
    tools = []
    if queryset.exists():
        for tool in queryset.iterator():
            tools.append(AllToolSerializer(tool).data)

        return Response(tools, status=status.HTTP_200_OK)
    else:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def get_searched_tool(request):
    queryset = Tool.objects.filter(title__contains=request.data['keyword'])
    tools = []
    if queryset.exists():
        for tool in queryset.iterator():
            tools.append(AllToolSerializer(tool).data)

        return Response(tools, status=status.HTTP_200_OK)
    else:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def get_tools_by_category(request):
    category_searched = Category.objects.get(name = request.data['category'])
    tools = Tool.objects.all()
    queryset = category_searched.tool_set.all()
    if not queryset:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)
    tools = []
    if queryset.exists():
        for tool in queryset.iterator():
            tools.append(AllToolSerializer(tool).data)

        return Response(tools, status=status.HTTP_200_OK)
    else:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def get_tool_alternative_tools(request):
    tool = Tool.objects.get(id = request.data['toolID'])

    if not tool: Response({'Not Found': 'Tool info not found.'}, status=status.HTTP_404_NOT_FOUND)

    queryset = tool.anternative_tool.all()
    tools = []
    if queryset.exists():
        for tool in queryset.iterator():
            tools.append(AllToolSerializer(tool).data)

        return Response(tools, status=status.HTTP_200_OK)
    else:
        return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT) 


@api_view(['POST'])
def add_remove_tool_to_bookmark(request):
    tool = Tool.objects.get(pk=request.data['tool_ID'])
    user = UserAccount.objects.get(email=request.data['user_Email'])

    if not tool: return Response({'Tool Not Found': 'Something went wrong!'}, status=status.HTTP_404_NOT_FOUND)

    if not user: return Response({'Unidentified User Email': 'Something went wrong!'}, status=status.HTTP_404_NOT_FOUND)

    if tool in user.bookmarked_tool.all():
        user.bookmarked_tool.remove(tool)
        return Response({'Success': 'Removing tool to bookmark success.'}, status=status.HTTP_200_OK)

    user.bookmarked_tool.add(tool)
    user.save()        
    return Response({'Success': 'Adding tool to bookmark success.'}, status=status.HTTP_201_CREATED)


class GetTool(APIView):
    serializer_class = ToolSerializer
    tool_ID = "toolID"

    def get(self, request, format=None):
        toolID = request.GET.get(self.tool_ID)
        if toolID != None:
            tool = Tool.objects.filter(id=toolID)
            if tool.exists():
                tool_data = ToolSerializer(tool[0]).data
                return Response(tool_data, status=status.HTTP_200_OK)
            return Response({'Tool Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


# class UpdateTool(APIView):
#     serializer_class = UpdateToolSerializer

#     def patch(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             id = serializer.data.get('id')
#             title = serializer.data.get('title')
#             description = serializer.data.get('description')
#             image = serializer.data.get('image')
#             url = serializer.data.get('url')
#             queryset = Tool.objects.filter(id=id)
#             if queryset.exists():
#                 tool = queryset[0]
#                 tool.title = title
#                 tool.description = description
#                 tool.image = image
#                 tool.url = url
#                 tool.save(update_fields=['title', 'description', 'image', 'url'])
#                 return Response(ToolSerializer(tool).data, status=status.HTTP_200_OK)
#             return Response({'Tool Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
#         return Response({'Bad Request': 'Code parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


# class BookmarkedTool(APIView):
#     def post(self, request, format=None):

#         tool = Tool.objects.get(pk=request.data['tool_ID'])
#         user = UserAccount.objects.get(email=request.data['user_Email'])

#         if not tool: return Response({'Tool Not Found': 'Something went wrong!'}, status=status.HTTP_404_NOT_FOUND)

#         if not user: return Response({'Unidentified User Email': 'Something went wrong!'}, status=status.HTTP_404_NOT_FOUND)

#         if tool in user.bookmarked_tool.all():
#             user.bookmarked_tool.remove(tool)
#             return Response({'Success': 'Removing tool to bookmark success.'}, status=status.HTTP_200_OK)

#         user.bookmarked_tool.add(tool)
#         user.save()        
#         return Response({'Success': 'Adding tool to bookmark success.'}, status=status.HTTP_201_CREATED)


# class GetUserBookmarkedTools(APIView):
#     def post(self, request, format=None):
#         user = UserAccount.objects.get(email=request.data['email'])
#         queryset = user.bookmarked_tool.all()
#         tools = []
#         if queryset.exists():
#             for tool in queryset.iterator():
#                 tools.append(AllToolSerializer(tool).data)

#             return Response(tools, status=status.HTTP_200_OK)
#         else:
#             return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.

#ListAPIView
Used for read-only endpoints to represent a collection of model instances.

#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.

#DestroyAPIView
Used for delete-only endpoints for a single model instance.

#UpdateAPIView
Used for update-only endpoints for a single model instance.

##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.

RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.

#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.

#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
            