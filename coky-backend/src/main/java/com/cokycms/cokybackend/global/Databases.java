package com.cokycms.cokybackend.global;

public class Databases {

    private static boolean PROD_MODE = false;

    public void initializeDatabase() {
        String host = null;
        String db_name = null;
        String user = null;
        String pass = null;

        if (PROD_MODE) {

        } else {

        }
    }

}
