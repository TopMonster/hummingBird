package io.hummingbird.enums;

public enum StatTypeEnum {

    CLICK("点击"), VIEW("曝光");

    public final String message;

    StatTypeEnum(String message) {
        this.message = message;
    }


    public String getMessage() {
        return message;
    }
}
