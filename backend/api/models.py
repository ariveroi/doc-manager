from django.db import models
import os
class Senador(models.Model):
    name = models.CharField(max_length=50, default="", null=False)
    last_name = models.CharField(max_length=100, null=False)
    created_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    subject = models.CharField(max_length=200, default="")
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    isAllDayEvent = models.BooleanField(default=False)
    tipo = models.CharField(max_length=50, default="comision")


class Comision(models.Model):
    senador = models.ForeignKey(Senador, on_delete=models.CASCADE)
    evento = models.OneToOneField(Event, on_delete=models.CASCADE)
    url = models.CharField(max_length=300, default="")

class Pleno(models.Model):
    evento = models.OneToOneField(Event, on_delete=models.CASCADE)
    url = models.TextField(default="")


class Mocion(models.Model):
    comision = models.ForeignKey(
        Comision, on_delete=models.CASCADE, blank=True, null=True)
    pleno = models.ForeignKey(
        Pleno, on_delete=models.CASCADE, blank=True, null=True)
    title = models.TextField(max_length=1000, null=False, unique=True)
    url = models.TextField(max_length=1000, default="")
    exp = models.CharField(max_length=50, default="")
    comision_global = models.CharField(max_length=100, default="")
    discurso = models.FileField(blank=True, null=True, upload_to="discursos")
    voto = models.IntegerField(default=1)
    pdf = models.TextField(default="")


class LeyesEnTramitacion(models.Model):
    name = models.TextField(default="", unique=True)
    url = models.CharField(max_length=300, default="")
    voto = models.IntegerField(default=1)
    enmiendas_doc = models.FileField(blank=True, null=True, upload_to="leyes")
    veto = models.FileField(blank=True, null=True, upload_to="leyes")
    defensa = models.FileField(blank=True, null=True, upload_to="leyes")
    created_at = models.DateField(auto_now_add=True)

class Enmienda(models.Model):
    mocion = models.OneToOneField(
        Mocion, on_delete=models.CASCADE, blank=True, null=True)
    title = models.TextField(max_length=500, default="Plantilla", unique=True)
    url = models.TextField(default="")

class Pregunta(models.Model):
    senador = models.OneToOneField(Senador, on_delete=models.CASCADE, null=False)
    document = models.FileField(null=False, upload_to="preguntas")
    status = models.BooleanField(default=False)
    respondida = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)


