from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UpdateToolSerializer, ToolsSerializer, CategoriesSerializer, CreateToolSerializer
from .models import Categories, Tools
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class CreateToolsAPIView(generics.CreateAPIView):
    queryset = Tools.objects.all()
    serializer_class = ToolsSerializer

class ViewTools(generics.ListAPIView):
    queryset = Tools.objects.all()
    serializer_class = ToolsSerializer


class CreateCategoryAPIView(generics.CreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

class ViewCategories(generics.ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer



class CreateToolView(APIView):
    serializer_class = CreateToolSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            img_src = serializer.data.get('img_src')
            url = serializer.data.get('url')
            tool = Tools(title=title, description=description, img_src=img_src, url=url)
            tool.save()
            return Response(ToolsSerializer(tool).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Informations sent is not valid.'}, status=status.HTTP_406_NOT_ACCEPTABLE)


class GetTool(APIView):
    serializer_class = ToolsSerializer
    tool_ID = "toolID"

    def get(self, request, format=None):
        toolID = request.GET.get(self.tool_ID)
        if toolID != None:
            tool = Tools.objects.filter(id=toolID)
            if tool.exists():
                tool_data = ToolsSerializer(tool[0]).data
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
            img_src = serializer.data.get('img_src')
            url = serializer.data.get('url')
            queryset = Tools.objects.filter(id=id)
            # print (len(queryset), flush=True)
            if queryset.exists():
                tool = queryset[0]
                tool.title = title
                tool.description = description
                tool.img_src = img_src
                tool.url = url
                tool.save(update_fields=['title', 'description', 'img_src', 'url'])
                return Response(ToolsSerializer(tool).data, status=status.HTTP_200_OK)
            return Response({'Tool Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request.'}, status=status.HTTP_400_BAD_REQUEST)
            