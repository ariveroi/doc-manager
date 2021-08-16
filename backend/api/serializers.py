from rest_framework import serializers
from .models import Senador, Comision, Mocion, Event, LeyesEnTramitacion, Enmienda, Pregunta, Pleno

class SenadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Senador
        fields = ('id', 'name', 'last_name', 'created_at')

class CreateSenadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Senador
        #Only the params we want to add
        fields = ('name', 'last_name')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'subject', 'startTime', 'endTime', 'isAllDayEvent', 'tipo')


class PlenoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pleno
        fields = ('id', 'evento', 'url')
class ComisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comision
        fields = ('id', 'senador', 'evento', 'url')

class MocionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mocion
        fields = ('id', 'comision', 'pleno', 'title', 'url', 'exp', 'comision_global', 'discurso', 'voto', 'pdf')
    
class LeyesEnTramitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeyesEnTramitacion
        fields = ('id', 'name', 'url', 'voto', 'enmiendas_doc', 'veto', 'defensa')

class EnmiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enmienda
        fields = ('id', 'title', 'url', 'mocion')

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ('id', 'senador', 'document', 'status', 'respondida', 'created_at')

# class DiscursoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Discurso
#         fields = ('id', 'name', 'discurso', 'mocion')