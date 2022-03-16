package com.example.loginnotepadjava;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText password;
    private Button button;
    public static String correct_password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        password = findViewById(R.id.password);
        button = (Button) findViewById(R.id.login);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correct_password = NotepadActivity.new_password;

                //validate password
                if (TextUtils.isEmpty(password.getText().toString())) {
                    Toast.makeText(MainActivity.this, "Empty input", Toast.LENGTH_LONG).show();
                }
                else if (password.getText().toString().equals(correct_password)) {
                    Toast.makeText(MainActivity.this, "Correct password", Toast.LENGTH_LONG).show();
                    openNotepad();
                }
                else
                    Toast.makeText(MainActivity.this, "Invalid password", Toast.LENGTH_LONG).show();
            }
        });
    }
    public void openNotepad() {
        Intent intent = new Intent(this, NotepadActivity.class);
        startActivity(intent);
    }
}