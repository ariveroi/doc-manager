from django.urls import path
from . import views

urlpatterns = [
    path('senadores', views.GetSenadoresView.as_view()),
    path('senador/new', views.CreateSenadorView.as_view()),
    path('get-senador', views.GetSenador.as_view()),
    path('senador/del/<int:id>', views.DeleteSenadorView.as_view()),
    path('comisiones', views.GetComisionesView.as_view()),
    path('comision/del/<int:id>', views.DeleteComisionView.as_view()),
    path('comision/get-comision', views.GetComisionView.as_view()),
    path('get/mociones', views.GetMocionesView.as_view()),
    path('get/mociones/pendientes', views.GetMocionesPendientesView.as_view()),
    path('new/event', views.PostEventView.as_view()),
    path('get/events', views.GetEventsView.as_view()),
    path('event/del/<int:id>', views.DeleteEventView.as_view()),
    path('leyes', views.GetLeyesView.as_view()),
    path('add/enmienda', views.PostEnmiendaView.as_view()),
    path('download/enmienda', views.DownloadEnmiendaView.as_view()),
    path('get/enmienda', views.GetEnmiendaView.as_view()),
    path('add/discurso', views.PostDiscursoView.as_view()),
    path('download/discurso', views.DownloadDiscursoView.as_view()),
    path('mocion/<int:id>', views.GetMocionDetail.as_view()),
    path('enmienda/del/<int:id>', views.DeleteEnmiendaView.as_view()),
    path('mocion/vote', views.ChangeVote.as_view()),
    path('login', views.Login.as_view()),
    path('logout', views.Logout.as_view()),
    path('add/pregunta', views.PostPregunta.as_view()),
    path('get/preguntas', views.GetPreguntas.as_view()),
    path('download/pregunta', views.DownloadPreguntaView.as_view()),
    path('pregunta/del/<int:id>', views.DeletePreguntaView.as_view()),
    path('get/plenos', views.GetPlenosView.as_view()),
    path('get/pleno/<int:id>', views.GetPlenoView.as_view()),
    path('pleno/add/mocion', views.PostMocion.as_view()),
    path('get/pleno/<int:id>/mociones', views.GetMocionesPleno.as_view()),
    path('get/mocion/<int:id>', views.GetMocion.as_view())
    # path('add/pleno', views.Ad)
    # path('delete-senador', DeleteSenador.as_view())
    # path('senadores', views.getSenadores, name="get_senadores"),
    # path('senador/delete/<int:id>', views.deleteSenador, name="delete_senador"),
    # path('senador/new', views.addSenador, name="add_senador")
]
