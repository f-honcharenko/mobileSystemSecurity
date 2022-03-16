package com.example.notes

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

class ChangePasswd : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_passwd)

        val dbClient = getSharedPreferences(packageName, Context.MODE_PRIVATE)

        findViewById<Button>(R.id.resetPassword).setOnClickListener {
            val passwd = findViewById<EditText>(R.id.oldPassword).text.toString()
            val storedPasswd = dbClient.getString("password", null)
            val newPasswd = findViewById<EditText>(R.id.editNewPassword).text.toString()
            if(passwd == storedPasswd) {
                dbClient.edit().putString("password", newPasswd).apply()
                Toast.makeText(this, "Password changed", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Password invalid", Toast.LENGTH_SHORT).show()
            }
        }
    }
}