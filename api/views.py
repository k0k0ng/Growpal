from queue import Empty
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser
from .serializers import UpdateToolSerializer, ToolSerializer, CategorySerializer, CreateToolSerializer, AllToolSerializer, UserAccountInfoSerializer
from .models import Category, Tool, UserAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

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
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_staff

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GetAllTools(APIView):
    def get(self, request, format=None):
        queryset = Tool.objects.all()
        tools = []
        if queryset.exists():
            for tool in queryset.iterator():
                tools.append(AllToolSerializer(tool).data)

            return Response(tools, status=status.HTTP_200_OK)
        else:
            return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def addTool(request):
    serilizer = CreateToolSerializer(data=request.data)
    if serilizer.is_valid():
        serilizer.save()
        tool = Tool.objects.last()
        return Response(ToolSerializer(tool).data, status=status.HTTP_201_CREATED)
    return Response({'Bad Request': 'Informations sent is not valid.'}, status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def register(request):
    user = User.objects.create_user(request.data.username, request.data.email, request.data.password1)
    if user.save():
        return Response("/", status=status.HTTP_201_CREATED)
    return Response({'Bad Request': 'Informations sent is not valid.'}, status=status.HTTP_406_NOT_ACCEPTABLE)


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


class UpdateTool(APIView):
    serializer_class = UpdateToolSerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            image = serializer.data.get('image')
            url = serializer.data.get('url')
            queryset = Tool.objects.filter(id=id)
            # print (len(queryset), flush=True)
            if queryset.exists():
                tool = queryset[0]
                tool.title = title
                tool.description = description
                tool.image = image
                tool.url = url
                tool.save(update_fields=['title', 'description', 'image', 'url'])
                return Response(ToolSerializer(tool).data, status=status.HTTP_200_OK)
            return Response({'Tool Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)


class BookmarkedTool(APIView):
    def post(self, request, format=None):

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


class GetUserBookmarkedTools(APIView):
    def post(self, request, format=None):
        user = UserAccount.objects.get(email=request.data['email'])
        if user:
            return Response(UserAccountInfoSerializer(user).data, status=status.HTTP_200_OK)
        else:
            return Response({'No Content': 'Request returns empty.'}, status=status.HTTP_204_NO_CONTENT)


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
            