from django import forms
from .models import application, STATUS_CHOICES


class ApplicationForm(forms.ModelForm):  
    status = forms.ChoiceField(choices=STATUS_CHOICES)
    class Meta: 
        model = application 
        fields = '__all__' 
