package com.example.protectednotepad2;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class MessageChangeActivity extends AppCompatActivity {

    Button changenote;
    EditText note;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_message_change);

        changenote = (Button) findViewById(R.id.changenote);
        note = (EditText) findViewById(R.id.note);

        changenote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text = note.getText().toString();
                SharedPreferences settings = getSharedPreferences("PREFS", 0);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("note", text);
                editor.apply();

                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }
}