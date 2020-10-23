package com.cokycms.cokybackend.global.classes;

/**
 * Clase exclusiva de excepciones
 */
public class CokyException extends Exception {

    /**
     * Default serialVersionUID
     */
    private static final long serialVersionUID = 1L;

    public CokyException() {
        super();
    }

    public CokyException(String message) {
        super(message);
    }

    public CokyException(String message, Throwable cause) {
        super(message, cause);
    }

    public CokyException(Throwable cause) {
        super(cause);
    }

    protected CokyException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
