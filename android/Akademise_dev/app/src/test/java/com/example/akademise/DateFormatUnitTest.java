package com.example.akademise;

import org.junit.Test;

import static org.junit.Assert.*;
import com.example.akademise.EditMilestonesActivity;
/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class DateFormatUnitTest {

    @Test
    public void check_date(){
        assertEquals("Date is not in correct format", true, EditMilestonesActivity.checkDateFormat("14/10/2019"));
    }
    @Test
    public void check_date2() {
        assertEquals("Date is in correct format", false, EditMilestonesActivity.checkDateFormat("14/10/20"));
    }
    @Test
    public void check_date3() {
        assertEquals("Date is in correct format", false, EditMilestonesActivity.checkDateFormat("14/12019"));
    }


}