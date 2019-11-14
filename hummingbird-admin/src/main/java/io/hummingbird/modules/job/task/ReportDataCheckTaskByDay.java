package io.hummingbird.modules.job.task;

import com.alibaba.fastjson.JSONObject;

import io.hummingbird.common.utils.DateUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.Map;

@Component("rportDataCheckTaskByDay")
public class ReportDataCheckTaskByDay    implements ITask{

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void run(String params) {

        Date calcDate = DateUtils.addDateDays(new Date(), -1);

        Map<String, Object> maps = JSONObject.parseObject(params, Map.class);
        if (null != maps) {
            Object date = maps.get("date");
            if (null != date && !StringUtils.isEmpty(date)) {
                calcDate = DateUtils.stringToDate(date.toString(), DateUtils.DATE_PATTERN);
            }
        }

        String nowDate = DateUtils.format(calcDate,DateUtils.DATE_PATTERN);
        String startTime = DateUtils.format(calcDate, DateUtils.DATE_PATTERN) +" 00:00:00";
        String currentTime = DateUtils.format(calcDate,DateUtils.DATE_PATTERN ) + " 23:59:59";

        logger.info("======定时任务统计H5转化数据ReportDataCheckTaskByDay === nowDate:{},startTime:{},currentTime:{}",nowDate,startTime,currentTime);


    }
}
