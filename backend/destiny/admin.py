from django.contrib import admin

# Register your models here.

from .models import *


class WeaponsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "weapon_name","table_name","weapon_type","damage_type","ammo_type","weapon_frame","image_link")

class GunsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "impact","range","stability","handling","reload_speed","rpm","magazine")

class SidearmsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "velocity","range","stability","handling","reload_speed","rpm","magazine")


class FusionsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id","impact","range","stability","handling","reload_speed","charge_time","magazine","burst")

class LaunchersAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "blast_radius", "velocity", "stability", "handling", "reload_speed", "rpm", "magazine")

class SwordsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "impact", "swing_speed", "charge_rate", "guard_resistance", "guard_endurance")

class BowsAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "impact", "accuracy", "stability", "handling", "reload_speed", "draw_time")

class PerksAdmin(admin.ModelAdmin):
    list_display = ("perk_id", "perk_name", "impact_change", "range_change", "stability_change", 
                    "handling_change", "reload_change", "rpm_change", "magazine_change", 
                    "reload_change_percentage", "magazine_change_percentage", "damage_change", 
                    "charge_time", "charge_rate", "guard_resistance", "guard_endurance", 
                    "blast_radius", "image_link")

class Weapon_PerksAdmin(admin.ModelAdmin):
    list_display = ("weapon_id", "perk_id", "slot_number")


admin.site.register(Weapons,WeaponsAdmin)
admin.site.register(Guns,GunsAdmin)
admin.site.register(Sidearms,SidearmsAdmin)
admin.site.register(Fusions,FusionsAdmin)
admin.site.register(Launchers,LaunchersAdmin)
admin.site.register(Swords,SwordsAdmin)
admin.site.register(Bows,BowsAdmin)
admin.site.register(Perks,PerksAdmin)
admin.site.register(Weapon_Perks,Weapon_PerksAdmin)
