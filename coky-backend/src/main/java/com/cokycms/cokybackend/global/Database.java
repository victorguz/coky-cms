package com.cokycms.cokybackend.global;

import com.cokycms.cokybackend.global.classes.CokyException;

public class Database {

    private static Database instance = null;
    // Dynamic values
    private static boolean PROD_MODE = false;
    // For the prod mode
    private String prod_host = null;
    private String prod_db = null;
    private String prod_user = null;
    private String prod_pass = null;
    // for dev mode
    private String local_host = null;
    private String local_db = null;
    private String local_user = null;
    private String local_pass = null;

    private Database() {

    }

    protected static Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    public void initializeDatabase() {
        if (PROD_MODE) {

        } else {

        }
    }

    public void setDriver(String _driver) throws CokyException {
        if (_driver == null || _driver.isEmpty()) {
            throw new CokyException("Especifique el driver de la base de datos");
        }
        driver = _driver;
    }

    public void setProdConnection(String _host, String _db, String _user, String _pass) throws CokyException {
        if (_host == null || _host.isEmpty()) {
            throw new CokyException("Especifique el host de la base de datos de producción");
        }
        if (_db == null || _db.isEmpty()) {
            throw new CokyException("Especifique el nombre de la base de datos de producción");
        }
        if (_user == null || _user.isEmpty()) {
            throw new CokyException("Especifique el usuario de la base de datos de producción");
        }
        if (_pass == null) {
            throw new CokyException("Especifique el password de la base de datos de producción");
        }
        prod_host = _host;
        prod_db = _db;
        prod_user = _user;
        prod_pass = _pass;
    }

    public void setLocalConnection(String _host, String _db, String _user, String _pass) throws CokyException {
        if (_host == null || _host.isEmpty()) {
            throw new CokyException("Especifique el host de la base de datos local");
        }
        if (_db == null || _db.isEmpty()) {
            throw new CokyException("Especifique el nombre de la base de datos local");
        }
        if (_user == null || _user.isEmpty()) {
            throw new CokyException("Especifique el usuario de la base de datos local");
        }
        if (_pass == null) {
            throw new CokyException("Especifique el password de la base de datos local");
        }
        local_host = _host;
        local_db = _db;
        local_user = _user;
        local_pass = _pass;
    }

    public void enableProdMode() {
        PROD_MODE = true;
        // The commands to do it
    }

    public void enableLocalMode() {
        PROD_MODE = false;
        // The commands to do it
    }

    public boolean isProdMode() {
        return PROD_MODE;
    }
}
