package com.example.notes

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.submitPassword).setOnClickListener {

            val passwd = findViewById<EditText>(R.id.editTextPassword).text.toString()
            // Toast.makeText(this, passwd, Toast.LENGTH_SHORT).show()
            val dbClient = getSharedPreferences(packageName, Context.MODE_PRIVATE)
            if(dbClient.contains("password")) {
                val storedPasswd = dbClient.getString("password", null)
                // Toast.makeText(this, "Password ${passwd == storedPasswd}", Toast.LENGTH_SHORT).show()
                if(passwd == storedPasswd) {
                    startActivity(Intent(this, Note::class.java))
                } else {
                    Toast.makeText(this, "Password invalid", Toast.LENGTH_SHORT).show()
                }
            } else {
                dbClient.edit().putString("password", passwd).apply()
            }
        }
        findViewById<Button>(R.id.passwdReset).setOnClickListener {
            startActivity(Intent(this, ChangePasswd::class.java))
        }
    }
}
