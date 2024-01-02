import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def busETA(request):
    bus_stop_code = request.GET.get('BusStopCode')
    print("Bus Stop Code:", bus_stop_code)

    # Make an axios call using the requests library
    api_url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2'
    
    # You might need to adjust the parameters based on the API documentation
    params = {'BusStopCode': bus_stop_code}

    # Include the required headers
    headers = {'AccountKey': 'sI9JhoYoRbqzNvshYOHVXQ=='}
    
    try:
        response = requests.get(api_url, params=params, headers=headers)
        # Process the response data as needed
    except requests.RequestException as e:
        print("Error making API request:", e)

    return HttpResponse(response)
