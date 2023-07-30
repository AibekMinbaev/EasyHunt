from django.db import models

STATUS_CHOICES  = {
    ('A', 'Applied'), 
    ('WA', 'Will Apply'), 
    ('R', 'Rejected'), 
    ('OA', 'Online Assessment'), 
    ('I1', 'Interview1'), 
    ('I2', 'Interview2'), 
    ('I3', 'Interview3'),
    ('I4', 'Interview4'),
}



# Create your models here.
class application(models.Model): 
    company = models.CharField(max_length=50) 
    country = models.CharField(max_length=50) 
    city = models.CharField(max_length=50) 
    comments = models.TextField(max_length=250) 
    URL = models.URLField() 
    status = models.CharField(choices=STATUS_CHOICES, max_length=2)    

    def __str__(self): 
        return self.company 


