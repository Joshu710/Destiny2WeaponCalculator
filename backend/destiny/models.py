from django.db import models

# Create your models here.

class Weapons(models.Model):

    # Ensures only these types of weapons are allowed
    TABLE_NAMES = [
        ('Guns','Guns'),
        ('Sidearms','Sidearms'),
        ('Fusions','Fusions'),
        ('Launchers','Launchers'),
        ('Swords','Swords'),
        ('Bows','Bows'),
    ]

    weapon_id = models.BigIntegerField(primary_key=True, null=False)
    weapon_name = models.CharField(max_length=50)
    table_name = models.CharField(max_length=10,choices=TABLE_NAMES)
    weapon_type = models.CharField(max_length=30)
    damage_type = models.CharField(max_length=30)
    ammo_type = models.CharField(max_length=30)
    weapon_frame = models.CharField(max_length=30)
    image_link = models.URLField()

    def __str__(self):
        return self.weapon_name
    

class Guns(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    impact = models.FloatField()
    range = models.FloatField()
    stability = models.FloatField()
    handling = models.FloatField()
    reload_speed = models.FloatField()
    rpm = models.FloatField()
    magazine = models.FloatField()


class Sidearms(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    blast_radius = models.FloatField()
    velocity = models.FloatField()
    range = models.FloatField()
    stability = models.FloatField()
    handling = models.FloatField()
    reload_speed = models.FloatField()
    rpm = models.FloatField()
    magazine = models.FloatField()

class Fusions(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    impact = models.FloatField()
    range = models.FloatField()
    stability = models.FloatField()
    handling = models.FloatField()
    reload_speed = models.FloatField()
    charge_time = models.FloatField()
    magazine = models.FloatField()
    burst = models.FloatField()

class Launchers(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    blast_radius = models.FloatField()
    velocity = models.FloatField()
    stability = models.FloatField()
    handling = models.FloatField()
    reload_speed = models.FloatField()
    rpm = models.FloatField()
    magazine = models.FloatField() 

class Swords(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    impact = models.FloatField()
    swing_speed = models.FloatField()
    charge_rate = models.FloatField()
    guard_resistance = models.FloatField()
    guard_endurance = models.FloatField()     

class Bows(models.Model):
    weapon_id = models.OneToOneField(Weapons, primary_key=True, null=False, on_delete=models.CASCADE, db_column="weapon_id")
    impact = models.FloatField()
    accuracy = models.FloatField()
    stability = models.FloatField()
    handling = models.FloatField()
    reload_speed = models.FloatField()
    draw_time = models.FloatField()     


class Perks(models.Model):
    perk_id = models.BigIntegerField(primary_key=True, null=False)
    perk_name = models.CharField(max_length=50)
    impact_change = models.FloatField()
    range_change = models.FloatField()
    stability_change = models.FloatField()
    handling_change = models.FloatField()
    reload_change = models.FloatField()
    rpm_change = models.FloatField()
    magazine_change = models.FloatField()
    reload_change_percentage = models.FloatField()
    magazine_change_percentage = models.FloatField(default=0)
    damage_change = models.FloatField()
    charge_time = models.FloatField()
    charge_rate = models.FloatField()
    guard_resistance = models.FloatField(default=0)
    guard_endurance = models.FloatField(default=0)
    blast_radius = models.FloatField(default=0)
    image_link = models.URLField()



class Weapon_Perks(models.Model):
    weapon_id = models.ForeignKey(Weapons, on_delete=models.CASCADE,db_column="weapon_id")
    perk_id = models.ForeignKey(Perks, on_delete=models.CASCADE,db_column="perk_id")
    slot_number = models.IntegerField()

    # Because doesn't allow for two attributes to form a primary key
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['weapon_id', 'perk_id'],
                name='unique_weapon_perk'
            ),
        ]


class Base_dps(models.Model):
    weapon_type = models.CharField(max_length=30)
    weapon_frame = models.CharField(max_length=30)
    body_damage = models.FloatField()
    crit_damage = models.FloatField()

    # Because doesn't allow for two attributes to form a primary key
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['weapon_type', 'weapon_frame'],
                name='unique_base_dps'
            ),
        ]



