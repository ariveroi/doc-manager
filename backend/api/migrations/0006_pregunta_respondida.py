# Generated by Django 3.1.5 on 2021-02-26 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_pregunta'),
    ]

    operations = [
        migrations.AddField(
            model_name='pregunta',
            name='respondida',
            field=models.BooleanField(default=False),
        ),
    ]
