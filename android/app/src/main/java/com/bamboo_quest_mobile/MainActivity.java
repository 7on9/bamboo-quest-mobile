package com.bamboo_quest_mobile;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreen_Fullscreen);
    super.onCreate(savedInstanceState);
  }
  @Override
  protected String getMainComponentName() {
    return "bamboo_quest_mobile";
  }
}
