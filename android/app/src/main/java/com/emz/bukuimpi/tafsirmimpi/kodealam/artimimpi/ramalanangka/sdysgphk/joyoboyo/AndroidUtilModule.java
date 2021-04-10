package com.emz.bukuimpi.tafsirmimpi.kodealam.artimimpi.ramalanangka.sdysgphk.joyoboyo;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.SharedPreferences;
import android.content.Context;
import androidx.appcompat.app.AlertDialog;
import org.json.JSONArray;
import android.content.DialogInterface;
import android.widget.Toast;
import android.os.Build;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import androidx.core.app.NotificationCompat;

public class AndroidUtilModule extends ReactContextBaseJavaModule {
   ReactApplicationContext context;

   public AndroidUtilModule(ReactApplicationContext reactContext) {
       super(reactContext);
       context = reactContext;
   }

   @Override
   public String getName() {
       return "AndroidUtil";
   }

   @ReactMethod
   public void getDeviceName(Callback cb) {
       try{
           cb.invoke(null, android.os.Build.MODEL);
       }catch (Exception e){
           cb.invoke(e.toString(), null);
       }
   }
   
   @ReactMethod
   public void readString(String name, String defaultValue, Callback cb) {
   		String value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getString(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void readInt(String name, int defaultValue, Callback cb) {
   		int value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getInt(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void readBoolean(String name, boolean defaultValue, Callback cb) {
   		boolean value = context.getSharedPreferences("data", Context.MODE_PRIVATE).getBoolean(name, defaultValue);
   		cb.invoke(value);
   }
   
   @ReactMethod
   public void writeString(String name, String value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putString(name, value);
   		e.commit();
   }
   
   @ReactMethod
   public void writeInt(String name, int value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putInt(name, value);
   		e.commit();
   }
   
   @ReactMethod
   public void writeBoolean(String name, boolean value) {
   		SharedPreferences sp = context.getSharedPreferences("data", Context.MODE_PRIVATE);
   		SharedPreferences.Editor e = sp.edit();
   		e.putBoolean(name, value);
   		e.commit();
   }
   
   @ReactMethod
   public void show(String message) {
   		Toast.makeText(getCurrentActivity(), message, Toast.LENGTH_LONG).show();
   }
   
   @ReactMethod
   public void showListDialog(String items, Callback cb) {
   		try {
   			JSONArray itemsJSON = new JSONArray(items);
	   		String[] menuItems = new String[itemsJSON.length()];
	   		for (int i=0; i<itemsJSON.length(); i++) {
	   			menuItems[i] = itemsJSON.getString(i);
	   		}
   			AlertDialog dialog = new AlertDialog.Builder(getCurrentActivity())
   				.setItems(menuItems, new DialogInterface.OnClickListener() {
   					
   					@Override
   					public void onClick(DialogInterface dialog, int position) {
   						cb.invoke(position);
   					}
   				})
   				.create();
   			dialog.show();
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
   }
   
    @ReactMethod
    public void showNotification(String title, String body) {
   		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
	        int importance = NotificationManager.IMPORTANCE_DEFAULT;
	        NotificationChannel channel = new NotificationChannel(getCurrentActivity().getPackageName()+".NOTIFICATIONS", "TafsirMimpi Notification",
	        	importance);
	        channel.setDescription("Notification channel for TafsirMimpi");
	        NotificationManager notificationManager = getCurrentActivity().getSystemService(NotificationManager.class);
	        notificationManager.createNotificationChannel(channel);
	    }
	    NotificationCompat.Builder builder = new NotificationCompat.Builder(getCurrentActivity(), getCurrentActivity().getPackageName()+".NOTIFICATIONS")
	        .setSmallIcon(R.drawable.ic_launcher)
	        .setContentTitle(title)
	        .setContentText(body)
	        .setPriority(NotificationCompat.PRIORITY_DEFAULT);
	    NotificationManager notificationManager = getCurrentActivity().getSystemService(NotificationManager.class);
	    notificationManager.notify((int)System.currentTimeMillis(), builder.build());
    }
}
