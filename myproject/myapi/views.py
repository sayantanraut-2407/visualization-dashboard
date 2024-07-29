from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from tkinter import filedialog as fd
import sqlalchemy as db
import pandas as pd
import urllib.parse

# Debug function to print messages
def debug_print(message):
    print(f"DEBUG: {message}")
    
    
@api_view(['GET'])
def hello_world(request):
    return Response({'message': {'id1': 'Data point 1', 'id2': 'Data point 2', 'id3': 'Data point 3'}})
    
@api_view(['GET'])
def fetch_drug_maps(request):
    def connect_db(username, password, hostname, database_name):
        try:
            con_string = f'postgresql://{username}:{password}@{hostname}/{database_name}'
            engine = db.create_engine(con_string)
            return engine
        except Exception as e:
            debug_print(f"Error connecting to the database: {e}")
            raise
    def load_auth():
        try:
            auth_location = fd.askopenfilename()
            with open(auth_location) as auth:
                lines = auth.read().splitlines()
            return lines
        except Exception as e:
            debug_print(f"Error loading authentication file: {e}")
            raise

    def get_drug_names(engine):
        try:
            sql = "SELECT DISTINCT figure_name FROM mapping_drug ORDER BY figure_name"
            df = pd.read_sql(sql, con=engine)
            return df['figure_name'].tolist()
        except Exception as e:
            debug_print(f"Error fetching drug names: {e}")
            raise
    sql_username, sql_password, sql_hostname, sql_port, sql_database_name = ['soragni', 'J2DLrbroCf*6c%8q*@Gnr', '10.47.35.47', '5432', 'sarcoma']
    
    print("username: ", sql_username)
    print("password: ", sql_password)
    print("hostname: ", sql_hostname)
    print("port: ", sql_port)
    print("database name: ", sql_database_name)

    sql_password_encoded = urllib.parse.quote_plus(sql_password)

    engine = connect_db(sql_username, sql_password_encoded, sql_hostname, sql_database_name)
    django_drug_list = get_drug_names(engine)
    
    return Response({'resp': django_drug_list})