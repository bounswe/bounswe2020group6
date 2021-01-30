package com.example.akademise;

import org.junit.Test;

import static org.junit.Assert.*;
import com.example.akademise.SignupFragment;
/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class EmailFormatUnitTest {

    @Test
    public void check_mail(){
        assertEquals( true, SignupFragment.checkEmail("kofal82256@alicdh.com"));
    }
    @Test
    public void check_mail2() {
        assertEquals(false, SignupFragment.checkEmail("sample?examplemail@gmail.com"));
    }
    @Test
    public void check_mail3() {
        assertEquals(true, SignupFragment.checkEmail("dikkikirta@nedoz.com"));
    }
    @Test
    public void check_mail4() {
        assertEquals( false, SignupFragment.checkEmail("email@example"));
    }
    @Test
    public void check_mail5() {
        assertEquals(true, SignupFragment.checkEmail("ali@gmail.com"));
    }
}