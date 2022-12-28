from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response


from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    Serializer = ProductSerializer(products, many=True)
    return Response(Serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)