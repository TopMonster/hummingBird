package io.hummingbird.modules.job.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("rportDataCheckTaskByDay")
public class DemoTask implements ITask {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void run(String params) {

		logger.info("======定时任务统计执行=== ");

	}
}
