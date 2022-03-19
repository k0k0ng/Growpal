from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser
from .serializers import UpdateToolSerializer, ToolSerializer, CategorySerializer, CreateToolSerializer
from .models import Category, Tool
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework.decorators import api_view

# Create your views here.
class CreateToolsAPIView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class ViewTools(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer


class CreateCategoryAPIView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ViewCategories(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


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
            