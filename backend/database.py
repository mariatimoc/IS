import pymysql

def get_connection():
    connection = pymysql.connect (
        host="localhost",
        user="root",
        password="Delia.mysql18",
        database="ehealth_db",
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection