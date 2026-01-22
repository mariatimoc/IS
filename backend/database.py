import pymysql

class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._config = {
                "host": "localhost",
                "user": "root",
                "password": "",
                "database": "ehealth_db",
                "cursorclass": pymysql.cursors.DictCursor,
            }
        return cls._instance

    def get_connection(self):
        return pymysql.connect (**self._config)


def get_connection():
    return Database().get_connection()