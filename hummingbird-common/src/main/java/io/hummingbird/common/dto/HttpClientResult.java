package io.hummingbird.common.dto;

public class HttpClientResult {
	/**
     * 响应状态码
     */
    private int code;

    /**
     * 响应数据
     */
    private String content;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public HttpClientResult(int code, String content) {
		super();
		this.code = code;
		this.content = content;
	}

	public HttpClientResult(int code) {
		super();
		this.code = code;
	}

	@Override
	public String toString() {
		return "HttpClientResult [code=" + code + ", content=" + content + "]";
	}
	
    
    
}
