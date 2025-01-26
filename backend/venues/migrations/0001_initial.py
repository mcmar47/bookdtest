# Generated by Django 4.2.18 on 2025-01-26 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Venue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.TextField()),
                ('capacity', models.IntegerField()),
                ('price_per_event', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
