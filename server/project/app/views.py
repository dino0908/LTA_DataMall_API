import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

@csrf_exempt
@require_POST
def busETA(request):
    data = json.loads(request.body.decode('utf-8'))
    bus_stop_code = data.get('BusStopCode')
    api_url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2'
    params = {'BusStopCode': bus_stop_code}
    headers = {'AccountKey': 'sI9JhoYoRbqzNvshYOHVXQ=='}

    try:
        response = requests.get(api_url, params=params, headers=headers)
        # Process the response data as needed
        print("API Response:", response.content)
    except requests.RequestException as e:
        print("Error making API request:", e)

    return HttpResponse(response)

@csrf_exempt
@require_POST
def busServicesGivenBusStop(request):
    data = json.loads(request.body.decode('utf-8'))
    bus_stop_code = data.get('BusStopCode') #correct
    api_url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2'
    params = {'BusStopCode': bus_stop_code}
    headers = {'AccountKey': 'sI9JhoYoRbqzNvshYOHVXQ=='}

    try:
        response = requests.get(api_url, params=params, headers=headers)
        # Process the response data as needed
        print("API Response:", response.content)
    except requests.RequestException as e:
        print("Error making API request:", e)

    return HttpResponse(response)
