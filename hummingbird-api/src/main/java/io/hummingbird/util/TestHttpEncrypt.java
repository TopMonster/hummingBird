package io.hummingbird.util;


import java.io.InputStream;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Properties;

import javax.crypto.SecretKey;

import org.junit.Test;
 
 
public class TestHttpEncrypt {
 
	//@Test
	public void testGenerateKeyPair() throws Exception{
		//生成RSA公钥和私钥，并Base64编码
		KeyPair keyPair = RSAUtil.getKeyPair();
		String publicKeyStr = RSAUtil.getPublicKey(keyPair);
		String privateKeyStr = RSAUtil.getPrivateKey(keyPair);
		System.out.println("RSA公钥Base64编码:" + publicKeyStr);
		System.out.println("RSA私钥Base64编码:" + privateKeyStr);
	}
	
	
	//@Test
	public void testGenerateAesKey() throws Exception{
		//生成AES秘钥，并Base64编码
		String base64Str = AESUtil.genKeyAES();
		System.out.println("AES秘钥Base64编码:" + base64Str);
	}
	
	//测试  APP加密请求内容
	//@Test
	public void testAppEncrypt() throws Exception{
		//APP端公钥和私钥从配置文件读取，不能写死在代码里
		Properties prop = new Properties();
		InputStream in = TestHttpEncrypt.class.getClassLoader().getResourceAsStream("client.properties");
		prop.load(in);
		String appPublicKey = prop.getProperty("app.public.key");
		//请求的实际内容
//		String content = "{\"name\":\"infi\", \"weight\":\"60\"}";
		String content = "{\"tenantid\":\"1\", \"account\":\"13015929018\", \"pwd\":\"123456\"}";
		String result = HttpEncryptUtil.appEncrypt(appPublicKey, content);
		System.out.println(result);
	}
	
	//测试  服务器解密APP的请求内容
	//@Test
	public void testServerDecrypt() throws Exception{
		String result = "{\"ak\":\"iLHfi1XRz4gnirU2OKggNCkz5x0i6aSonm1u3bE+ncI4AuiUG9LX2nbrQV/lWUIqwRp/q/P+SrIPnh5JbgEzSi+K46N4enyDFYbWpC6gONqQpF3tNt6Q1Y+UdX3L5l9hFPAS9tIhI2kT10AbhMox2kKOhr6ZQmmC/A3qeFEbTuUUf8bOCr4nqz4qSNyCZgcJdoAQonJeN8IilWuTD+LpbllNimFNR/sGY5jlyjvVydrdpNs15oFaXtfTLUjSXe2e5Ha1r3K7lP93C2E+KL55001xFJhQZcZXa9ZlYCMQgI+2cJlED4uA3bl2ul1dtnvXK+41Yky9e9QrRDc5luqB6w==\",\"apk\":\"P0SJaTzKWuBMi/fj2G8wwZ9+FWFIrE3BAwdoXwIfiTxptYXumLxnMpZZkCBNqQBvhvSzAEPyA3c9kCjhYCxdTnV61N+T/DZM+B62u4vqCy1MsFZT06BJjrNFW29AfSRNmQdKhJEyDPARcf5FerULbIDWGvrHzHys7jVbicjlYWtQpnyQf5Wl0Bd7taEqSwUSKejoEsN74frwlk8Hu4KP4bLvVy9S7DjOP2juXbVkHYaKgVmhM2V3yElVOEb1TDCLSFMNtug74+7itlzlChDR8wEWdh11vQcp69iGmDXMo2vcJ9tO1YZP+hCYZvujHMRwAzHtkqafEoSJsvSN8PWS+qmQdUX2frf6A0cl6SGnTbGUUEV/w0rBIU/oGhP8cl8+ghqPbp7HzvwXFOJsUciy+7tsLRrdDpLeOcz+fh/c0RSpCKNEZtRmcuUqBQ+3tZKYGPhl+StsFh3s1RCkhI4EsSD95bCbES4r1r1E4dytdELi0ebJug7Quk3rwFVXGX9o4wrnnvcbTaSyyAAg2YTNfA==\",\"ct\":\"mkC7hE/crHbmW+h2OCMBANCA64xtMFLTRmLahOU+UysZrXzK30qRj6RUcvpQz4mJ6EOYYAK34+BQBkN9gapdIw==\"}";
		System.out.println(HttpEncryptUtil.serverDecrypt(result));
	}
	
	//测试 服务器加密响应给APP的内容
	//@Test
	public void testserverEncrypt() throws Exception{
		String aesKeyStr = "dSRWXM6IkWkKk7I/ZGouqA==";
		String appPublicKeyStr = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqqKPH/L0AZyn1fJ9xK2ol2nHY5jPu8qw7COwFukkRdr2j0oNJmD8vCTmxgzKWV0CkihiJ7Y0OekrGc78JL5tpL2SqeZTLa2bCJZJaTM3KFOXYb82nc8Xbr2caDnf7mgjyt0AALHG/YfYwd7hifZRB6Ct89uBTn6W5x/7oxGT6D1C8siXKV+99AZPMv2HobglWyquyjIL5TZOhYmCMzFUPMOiXzzGYXMZj2gmfUFXMf/2jitMPGg3zQPJxPSYunjoE1fMInk1obEhEfU8n2YxT5ZbGMWZGjt4hZwF+FJJLV+WOantfUJ4rMBB8qxgQtkT+VzddfLCEoyy4Rl50fvjzwIDAQAB";
		String content = "{\"retcode\":\"200\"}";
		System.out.println(HttpEncryptUtil.serverEncrypt(appPublicKeyStr, aesKeyStr, content));
	}
	
	//测试 	APP解密服务器的响应内容
	//@Test
	public void testAppDecrypt() throws Exception{
		//APP端公钥和私钥从配置文件读取，不能写死在代码里
		Properties prop = new Properties();
		InputStream in = TestHttpEncrypt.class.getClassLoader().getResourceAsStream("client.properties");
		prop.load(in);
		String appPrivateKey = prop.getProperty("app.private.key");
		String content = "{\"ak\":\"mRBa005mea+6QIaFhTHrfCTBBFL+sy1uHI1iSN6LUK5/VQK/Bt9JZ+5/e2TQYMiD8U6KXBzZgHOl4RL8AErno9K4bbC+4Ke5Bl/IIGZ6kPJB4OjzbqBwxmmA+zJrcS3TlzIsVGpuIzGMQzIT0rlJl+BsQj6N9F3jfCeXBXH+JoTPEaTZqzQ9odgfPooP8jvuBOneqAiTmIgNzcVJwr7EB1tB65FjYPWFJqC0xrmLlrvev0KrD/XnKkzL1wGHc/eXeYzRXHuz4tbTHQV0mrZNz+tITXPVorRb0Tl0mglUafiqTkUBsXUv4abUvz2JImlF1nSAmQfKWfMNd7Fwag480g==\",\"ct\":\"DPMIYZaJL5e7Jvs2Vsy6jgnEPWBYFgjb1K1yf7gcWUCVyAfBPkLGK93onQkvLl8urp2yTwEsxzP6o1om0mqjkEU4oPpYf4NJC+QPQRQ2YTo=\"}";
		System.out.println(HttpEncryptUtil.appDecrypt(appPrivateKey, content));
	}
	@Test
	public void test()throws Exception{


		//待加密密文
		String content = "{\"tenantid\":\"1\", \"account\":\"13015929018\", \"pwd\":\"123456\"}";
		System.out.println("准备需要加密的明文json数据："+content);
		//随机生成aes密钥
		String base64Str = AESUtil.genKeyAES();
		System.out.println("AES随机生成的密钥Base64编码:" + base64Str);
		//对明文内容进行aes加密
		String aesEncroptContent=aesEncriptContent(content, base64Str);

		//rsa加密aeskey
		String appPublicKeyStr = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqqKPH/L0AZyn1fJ9xK2ol2nHY5jPu8qw7COwFukkRdr2j0oNJmD8vCTmxgzKWV0CkihiJ7Y0OekrGc78JL5tpL2SqeZTLa2bCJZJaTM3KFOXYb82nc8Xbr2caDnf7mgjyt0AALHG/YfYwd7hifZRB6Ct89uBTn6W5x/7oxGT6D1C8siXKV+99AZPMv2HobglWyquyjIL5TZOhYmCMzFUPMOiXzzGYXMZj2gmfUFXMf/2jitMPGg3zQPJxPSYunjoE1fMInk1obEhEfU8n2YxT5ZbGMWZGjt4hZwF+FJJLV+WOantfUJ4rMBB8qxgQtkT+VzddfLCEoyy4Rl50fvjzwIDAQAB";
		String rasEncriptAesKey=rsaEncriptKey(base64Str, appPublicKeyStr);
		System.out.println("用ras公钥加密后的aes密钥："+rasEncriptAesKey);
		System.out.println("用aes密钥加密后的内容密钥："+aesEncroptContent);

		//开始解密
		System.out.println("开始解密");
		//通过rsa私钥解密rsa密钥
		String appPrivateKeyStr = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCqoo8f8vQBnKfV8n3EraiXacdjmM+7yrDsI7AW6SRF2vaPSg0mYPy8JObGDMpZXQKSKGIntjQ56SsZzvwkvm2kvZKp5lMtrZsIlklpMzcoU5dhvzadzxduvZxoOd/uaCPK3QAAscb9h9jB3uGJ9lEHoK3z24FOfpbnH/ujEZPoPULyyJcpX730Bk8y/YehuCVbKq7KMgvlNk6FiYIzMVQ8w6JfPMZhcxmPaCZ9QVcx//aOK0w8aDfNA8nE9Ji6eOgTV8wieTWhsSER9TyfZjFPllsYxZkaO3iFnAX4UkktX5Y5qe19QniswEHyrGBC2RP5XN118sISjLLhGXnR++PPAgMBAAECggEAAP6dkvQZlADTwZ1+Oi1A9FD7hosXeuK9kULL/fYx7e5OzZsC5JxgHMCiT7k3XLn8D9oIaG7ZcxT22VmpgpVRkkpAlpjvFy8R3kTx/Jj901BZa4pvyQ+x9UVJqhncQkl9G+uZ2mcu379w9gBUlDdJVaAMI4W+BTUbsBExqEur7wiZ8S3XK3rDltKINIguPRjwVTTuepzrTNd3k7WKPD8za/OV87bGEbaGLLo8KSKzm7bJnyMSbUwkjKA+WezNidUatB1fqaXDnlVYokCdfBD7xypbbVO+HoBNNBgAwT5p3dm3hbgYsb9WNZLJXREMaNtp+AhWHGFj4qeYRl8dfGO7oQKBgQDYXTChQhKdo80nFWMtFvh1yw75uma0oOpnHEiIfYh1ekcTBLlgsGTbg60t5Klb2lF1SdfhNXb+4WQNmSMlQYoKwakiRn2JyKbk+zs/j6q1r1PV1QAP5LJ28J/FjG5bEyCXQdE9nVhTps1EX2Fuy6I9pKCQKuv86NPOsX7IMat4VwKBgQDJ5NFcORrRgxLwcx/eYGjyeyf7EDKacVpd6SzobakXnvaX3WCxw2wjvbex+zL1s+XnLmp+4l87FfuP0+yd78pRHASXwDh6MNqs8bN2ksT4LOb7bImXygcxkX8Iog9qkydKZ1kUgLtDPZMzSUyic0+/6qVro9JR3aw0oJly9p4lSQKBgQCli6gJumRD+XCe1t5rQYgZmKR8rwKmcfjnq9xTkrk2Kbj39EVilZSV4MpAsxRiE0kAVN+4kQ/bNNk5DlK1zs+wKz0d3JFxOvV3fkJ2/5W+LcgXdEH35yQlnTaiEDDfvmLRWKqgWiOa3aVxCwmhnG0mfS/dHvoxKHPnUiePRXHNQQKBgQC7lZrgsT41xC9osc6+c52PDtbK8vXRgdiQwQI0ww8FH3HHEK2y/PwRCUkQWXGz0P6fmgTg97u7zmT58dI7vHyieAHcbYEMJzBG2BwC48OXQ0EqAmKlYdTlPWZmwwzH3Qn4m6Ws4x8bDq8iS8ykc7d5fa9NH91eqzRBgaaRpoqx4QKBgEzWhwVHhTxdSBzqh6JaTKVUOrt1CwsbQOSlOy/Y8k/TJFJaQh+/yGKSBpkGLfWkY5HVra+nhAgWuCB2X301DpSMCQtTiABYvjGNNysrkm40xQOuTOmO6OTqDfyVQZmi/xUXeztiT2vKjz0em+tButyg7OP7zKzYwqW3KhAxZ94t";
		PrivateKey appPrivateKey = RSAUtil.string2PrivateKey(appPrivateKeyStr);
		//用APP私钥解密AES秘钥
		byte[] aesKeyBytes = RSAUtil.privateDecrypt(RSAUtil.base642Byte(rasEncriptAesKey), appPrivateKey);
		//用AES秘钥解密请求内容
		SecretKey aesKey = AESUtil.loadKeyAES(new String(aesKeyBytes));
		byte[] response = AESUtil.decryptAES(RSAUtil.base642Byte(aesEncroptContent), aesKey);
		System.out.println("解密后的内容："+new String(response));

	}
	
	private String aesEncriptContent(String content,String base64Str) throws Exception{
		SecretKey aesKeyBase64 = AESUtil.loadKeyAES(base64Str);
		byte[] encryptContent = AESUtil.encryptAES(content.getBytes(), aesKeyBase64);
		return RSAUtil.byte2Base64(encryptContent).replaceAll("\r\n", "");
	}
	
	private String rsaEncriptKey(String aesKey,String publicKeyStr)throws Exception{
		PublicKey appPublicKey = RSAUtil.string2PublicKey(publicKeyStr);
		byte[] encryptAesKey = RSAUtil.publicEncrypt(aesKey.getBytes(), appPublicKey);
		return RSAUtil.byte2Base64(encryptAesKey).replaceAll("\r\n", "");
	}
}
