package com.example.protectednotepad2;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    Button changepassword;
    Button notechange;
    TextView thenote;
    String notee;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SharedPreferences settings = getSharedPreferences("PREFS", 0);
        notee = settings.getString("note", "");

        changepassword = (Button) findViewById(R.id.changepassword);
        notechange = (Button) findViewById(R.id.notechange);
        thenote = (TextView) findViewById(R.id.thenote);

        thenote.setText(notee);

        changepassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), NewPasswordActivity.class);
                startActivity(intent);
                finish();
            }
        });

        notechange.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent2 = new Intent(getApplicationContext(), MessageChangeActivity.class);
                startActivity(intent2);
                finish();
            }
        });

    }


}