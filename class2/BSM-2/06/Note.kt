package com.example.notes

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class Note : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_note)

        val dbClient = getSharedPreferences(packageName, Context.MODE_PRIVATE)
        val savedNote = dbClient.getString("note", "")
        findViewById<EditText>(R.id.editNote).setText(savedNote)
        findViewById<Button>(R.id.saveButton).setOnClickListener {
            dbClient.edit().putString("note", findViewById<EditText>(R.id.editNote).text.toString()).apply()
            finish()
        }
    }
}