package com.gucci.lumiaries;

import com.gucci.luminaries.LuminariesApplication;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes={LuminariesApplication.class})
public class LumiariesApplicationTests {

	@Test
	public void contextLoads() {
	}

}
