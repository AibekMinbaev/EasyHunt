import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from .forms import ApplicationForm
from .models import application


status_dic = {
    "Will Apply" : "WA", 
    "Applied" : "A", 
    "OA" : "OA", 
    "Rejected" : "R", 
    "Intrvw1" : "I1", 
    "Intrvw2" : "I2", 
    "Intrvw3" : "I3", 
    "Intrvw4" : "I4"
}





# Create your views here.
def dashboard(request): 
    if request.method == 'GET': 
        applications = application.objects.all() 
        wa,a,oa,r,i1,i2,i3,i4 = [], [], [], [], [], [],[],[]
        for elem in applications: 
            st = elem.status 
            if st == "WA": 
                wa.append(elem) 
            elif st == "A": 
                a.append(elem) 
            elif st == "R": 
                r.append(elem) 
            elif st == "OA": 
                oa.append(elem) 
            elif st == "I1": 
                i1.append(elem) 
            elif st == "I2": 
                i2.append(elem) 
            elif st == "I3": 
                i3.append(elem)  
            elif st == "I4": 
                i4.append(elem)
        context = {"wa": wa, "a":a, "oa":oa, "r":r, "i1":i1, "i2":i2, "i3":i3, "i4":i4}
        return render(request, "dashboard.html",context)
    else: 
        return JsonResponse({'success': False, 'errors': 'Invalid request method'}) 


@csrf_exempt ## think about this part 
def createview(request): 
    if request.method == 'POST': 
        print(request.body)
        json_data = json.loads(request.body)
        form = ApplicationForm(json_data) 
        if form.is_valid(): 
            form.save()
            print("Success")
            return JsonResponse({'success': True}) 
        else: 
            print("Not validate")
            return JsonResponse({'success': False, 'errors':form.errors}) 
    else:
        return JsonResponse({'success': False, 'errors': 'Invalid request method'}) 
    
 
@csrf_exempt ## think about this part 
def search_view(request): 
    if request.method == "POST":
        json_data = json.loads(request.body) # request.body are bytes  
        searchCompany = json_data["company"] 
        searchStatus = json_data["status"] 

        if searchStatus == "All":
            if searchCompany == "": 
                applications = application.objects.all()
            else: 
                applications = application.objects.filter(company__iexact=searchCompany) # iexact makes sure search ignoring the case 
        else: 
            if searchCompany == "": 
                applications = application.objects.filter(status=searchStatus)
            else: 
                applications = application.objects.filter(status=searchStatus, company__iexact=searchCompany) 
        
        #print(applications) ## applications is a queryset type here
        data = list(applications.values())
        json_data = json.dumps(data) 
        print(json_data)
        return HttpResponse(json_data, content_type='appliction/json')
    
    else:
        return JsonResponse({"success":False, "error":"invalid request method"})
    

@csrf_exempt ## think about this part 
def update_view(request): 
    if request.method == "PUT": 
        json_data = json.loads(request.body) 
        updateId = json_data["id"] 
        updateStatus = json_data["status"] 

        update_instance = application.objects.get(id=updateId) 
        update_instance.status = status_dic[updateStatus]

        print(update_instance, update_instance.status) 
        update_instance.save() 
        return JsonResponse({"Success": True})
    else: 
        return JsonResponse({"Success":False, "Error": "Invalid request method"})
    
