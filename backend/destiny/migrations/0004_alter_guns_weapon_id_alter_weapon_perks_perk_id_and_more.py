# Generated by Django 5.0.3 on 2024-04-19 17:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destiny', '0003_weapon_perks_unique_weapon_perk'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guns',
            name='weapon_id',
            field=models.OneToOneField(db_column='weapon_id', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='destiny.weapons'),
        ),
        migrations.AlterField(
            model_name='weapon_perks',
            name='perk_id',
            field=models.ForeignKey(db_column='perk_id', on_delete=django.db.models.deletion.CASCADE, to='destiny.perks'),
        ),
        migrations.AlterField(
            model_name='weapon_perks',
            name='weapon_id',
            field=models.ForeignKey(db_column='weapon_id', on_delete=django.db.models.deletion.CASCADE, to='destiny.weapons'),
        ),
    ]