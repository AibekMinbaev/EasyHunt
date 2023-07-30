# Generated by Django 4.2 on 2023-05-01 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('savemeapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='status',
            field=models.CharField(choices=[('I2', 'Interview2'), ('A', 'Applied'), ('R', 'Rejected'), ('I1', 'Interview1'), ('I3', 'Interview3'), ('OA', 'Online Assessment'), ('I4', 'Interview4'), ('WA', 'Will Apply')], max_length=2),
        ),
    ]
