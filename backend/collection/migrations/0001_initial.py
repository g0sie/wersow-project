# Generated by Django 4.0 on 2023-02-23 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '__first__'),
        ('videos', '0003_video_todays'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collected', models.DateField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collection', to='users.user')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collection', to='videos.video')),
            ],
        ),
    ]
