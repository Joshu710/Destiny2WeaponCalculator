from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import mysql.connector
# Create your views here.


# Returns Weapons of search result
@api_view(["GET"])
def search_weapons(request,search_text):
    dataBase = mysql.connector.connect(
        host ="localhost",
        user ="d2project",
        passwd ="Hths1234!",
        database = "d2project"
    )

    cursor = dataBase.cursor()
    query = "SELECT * FROM destiny_weapons WHERE weapon_name LIKE %s;"
    cursor.execute(query, ('%' + search_text + '%',))

    res = cursor.fetchall()
    
    dataBase.close()
    return Response({"data":res},status=status.HTTP_200_OK)

# Returns Perks of search result
@api_view(["GET"])
def search_perks(request,search_text):
    dataBase = mysql.connector.connect(
        host ="localhost",
        user ="d2project",
        passwd ="Hths1234!",
        database = "d2project"
    )

    cursor = dataBase.cursor()
    query = "SELECT * FROM destiny_perks WHERE perk_name LIKE %s;"
    cursor.execute(query, ('%' + search_text + '%',))

    res = cursor.fetchall()
    
    dataBase.close()
    return Response({"data":res},status=status.HTTP_200_OK)

# Returns all perk data
@api_view(["GET"])
def all_perks(request):
    dataBase = mysql.connector.connect(
        host ="localhost",
        user ="d2project",
        passwd ="Hths1234!",
        database = "d2project"
    )

    cursor = dataBase.cursor()
    cursor.execute("SELECT * FROM destiny_perks;")
    res = cursor.fetchall()
    
    dataBase.close()
    return Response({"data":res},status=status.HTTP_200_OK)

# Returns all weapons that use a certain perk
@api_view(["GET"])
def perk_weapons(request,id):
    dataBase = mysql.connector.connect(
        host ="localhost",
        user ="d2project",
        passwd ="Hths1234!",
        database = "d2project"
    )
    cursor = dataBase.cursor()
    cursor.execute(f'select destiny_weapons.*, specific_weapon.perk_id, specific_weapon.slot_number  from (select * from destiny_weapon_perks where perk_id = {id}) as specific_weapon natural left join destiny_weapons;')
    res = cursor.fetchall()
    
    dataBase.close()
    return Response({"perk_weapons":res},status=status.HTTP_200_OK)


# Returns all weapon data
@api_view(["GET"])
def all_weapons(request):

    dataBase = mysql.connector.connect(
        host ="localhost",
        user ="d2project",
        passwd ="Hths1234!",
        database = "d2project"
    )

    cursor = dataBase.cursor()
    cursor.execute("SELECT * FROM destiny_weapons;")
    res = cursor.fetchall()
    dataBase.close()
    return Response({"data":res},status=status.HTTP_200_OK)


# Returns specific weapon data and perks it can use
@api_view(["GET"])
def get_weapon_data(request,id,table):
    try:
        dataBase = mysql.connector.connect(
            host ="localhost",
            user ="d2project",
            passwd ="Hths1234!",
            database = "d2project"
        )
        cursor = dataBase.cursor(dictionary=True)
        cursor.execute(f"SELECT * FROM (SELECT * FROM destiny_weapons natural join destiny_{table.lower()} where weapon_id = {id}) as specific_weapon natural join destiny_base_dps;")
        weapon_data = cursor.fetchall()

        
        
        cursor = dataBase.cursor(dictionary=True)
        cursor.execute(f"select * from (select * from destiny_weapon_perks where weapon_id = {id}) as specific_weapon natural join destiny_perks order by slot_number;")
        perk_data = cursor.fetchall()
        res = {1:[],2:[],3:[],4:[],5:[]}
        for perk in perk_data:
            res[perk["slot_number"]].append(perk)
        dataBase.close()
        return Response({"weapon_data": weapon_data, "perk_data":res},status=status.HTTP_200_OK)
    except mysql.connector.Error as e:
        return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)