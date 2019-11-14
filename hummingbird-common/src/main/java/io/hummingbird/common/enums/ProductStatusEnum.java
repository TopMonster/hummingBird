package io.hummingbird.common.enums;

/**
 * 产品状态
 * @author caz
 */
public enum ProductStatusEnum {

    ONLINE("1"), OFFLINE("0");

    public final String code;

    ProductStatusEnum(String code) {
        this.code = code;
    }


    public String getCode() {
        return code;
    }
}
