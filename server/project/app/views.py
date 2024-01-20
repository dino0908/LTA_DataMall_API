import requests
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse

@csrf_exempt
@require_POST
def busETA(request):
    api_url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2'
    data = json.loads(request.body.decode('utf-8'))
    bus_stop_code = data.get('BusStopCode')
    bus_service_code = data.get('ServiceNo') #bus_service_code can either be the bus service or ''
    if (bus_service_code != ''):
        params = {'BusStopCode': bus_stop_code, 'ServiceNo': bus_service_code}
    else:
        params = {'BusStopCode': bus_stop_code}
    
    headers = {'AccountKey': 'sI9JhoYoRbqzNvshYOHVXQ=='}

    try:
        response = requests.get(api_url, params=params, headers=headers)
        # Process the response data as needed
        # print("API Response:", response.content)
    except requests.RequestException as e:
        print("Error making API request:", e)

    return HttpResponse(response)

@csrf_exempt
@require_POST
def carpark(request):
    api_url = 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2'
    body = json.loads(request.body.decode('utf-8'))
    area = body.get('area')
    search = body.get('search')


    headers = {'AccountKey': 'sI9JhoYoRbqzNvshYOHVXQ=='}

    #if area is not '', filter data - area must match
    #if search is not '', filter data - development must contain search
    try:
        response = requests.get(api_url, headers=headers)
        content = json.loads(response.content)
        filtered_data_by_area = []
        filtered_data_by_area_and_search = []
        
        if area == '':
            filtered_data_by_area = content.get('value', [])

        if area != '':
            for i in range(0, len(content.get('value', []))):
                each_index_data = content.get('value', [])[i]
                if each_index_data['Area'] == area:
                    filtered_data_by_area.append(each_index_data)
        
        if search != '':
            for i in range(len(filtered_data_by_area)):
                each_index_data = filtered_data_by_area[i]
                if search.lower() in each_index_data['Development'].lower():
                    filtered_data_by_area_and_search.append(each_index_data)   
            
            return JsonResponse(filtered_data_by_area_and_search, safe=False)

        return JsonResponse(filtered_data_by_area, safe=False)

    except requests.RequestException as e:
        print("Error making API request:", e)



