import os
import django
import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from destiny.models import *


# Loads in our data in puts its into Django Models
def loadData(path):
    db = pd.read_excel(path, engine='openpyxl', sheet_name=None)

    curr = db["Weapons"]
    for index, row in curr.iterrows():
        weapon_id, weapon_name, table_name, weapon_type, damage_type, ammo_type, weapon_frame, image_link = row
        obj = Weapons(weapon_id=weapon_id,weapon_name=weapon_name,table_name=table_name,weapon_type=weapon_type,damage_type=damage_type,ammo_type=ammo_type, weapon_frame= weapon_frame,image_link= image_link)
        obj.save()


    curr = db["Guns"]
    for index, row in curr.iterrows():
        weapon_id, impact,range, stability, handling, reload_speed, rpm, magazine = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj = Guns(weapon_id=weapon, impact=impact,range=range, stability=stability, handling=handling, reload_speed=reload_speed, rpm=rpm, magazine=magazine)
        obj.save()

    curr = db["Sidearms"]
    for index, row in curr.iterrows():
        weapon_id, blast_radius, velocity,range,stability,handling,reload_speed,rpm,magazine = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj =Sidearms(weapon_id=weapon, blast_radius=blast_radius,velocity=velocity,range=range,stability=stability,handling=handling,reload_speed=reload_speed,rpm=rpm,magazine=magazine)
        obj.save()

    curr = db["Fusions"]
    for index, row in curr.iterrows():
        weapon_id, impact,range, stability, handling, reload_speed, charge_time, magazine, burst = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj = Fusions(weapon_id=weapon, impact=impact,range=range, stability=stability, handling=handling, reload_speed=reload_speed, charge_time=charge_time, magazine=magazine, burst=burst)
        obj.save()


    curr = db["Launchers"]
    for index, row in curr.iterrows():
        weapon_id, blast_radius, velocity, stability,handling,reload_speed,rpm,magazine = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj = Launchers(weapon_id=weapon, blast_radius=blast_radius,velocity=velocity,stability=stability,handling=handling,reload_speed=reload_speed,rpm=rpm,magazine=magazine)
        obj.save()

    curr = db["Swords"]
    for index, row in curr.iterrows():
        weapon_id, impact, swing_speed,charge_rate,guard_resistance,guard_endurance = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj = Swords(weapon_id=weapon, impact=impact,swing_speed=swing_speed,charge_rate=charge_rate,guard_resistance=guard_resistance,guard_endurance=guard_endurance)
        obj.save()


    curr = db["Bows"]
    for index, row in curr.iterrows():
        weapon_id, impact, accuracy,stability,handling,reload_speed,draw_time = row
        weapon = Weapons.objects.get(pk=weapon_id)
        obj = Bows(weapon_id=weapon, impact=impact,accuracy=accuracy,stability=stability,handling=handling,reload_speed=reload_speed,draw_time=draw_time)
        obj.save()


    curr = db["Perks"]
    for index, row in curr.iterrows():
        perk_id, perk_name, impact_change, range_change, stability_change, handling_change, reload_change, rpm_change, magazine_change, reload_change_percentage, magazine_change_percentage, damage_change, charge_time, charge_rate, guard_resistance,guard_endurance,blast_radius, image_link = row
        obj = Perks(perk_id=perk_id,perk_name=perk_name,impact_change=impact_change,range_change=range_change, stability_change=stability_change,handling_change=handling_change, reload_change=reload_change, rpm_change=rpm_change,magazine_change=magazine_change, reload_change_percentage=reload_change_percentage, magazine_change_percentage=magazine_change_percentage, damage_change=damage_change, charge_time=charge_time, charge_rate=charge_rate, guard_resistance=guard_resistance, guard_endurance=guard_endurance, blast_radius=blast_radius,image_link=image_link)
        obj.save()

    curr = db["Weapon_Perks"]
    for index, row in curr.iterrows():
        weapon_id, perk_id, slot_number = row
        weapon = Weapons.objects.get(pk=weapon_id)
        perk = Perks.objects.get(pk=perk_id)
        obj = Weapon_Perks(weapon_id=weapon,perk_id=perk, slot_number=slot_number)
        obj.save()

    curr = db["base_dps"]
    for index, row in curr.iterrows():
        weapon_type, weapon_frame, body_damage, crit_damage = row
        obj = Base_dps(weapon_type=weapon_type, weapon_frame= weapon_frame, body_damage=body_damage, crit_damage=crit_damage)
        obj.save()
    


if __name__ == "__main__":
    file_path = "dataset.xlsx"
    loadData(file_path)