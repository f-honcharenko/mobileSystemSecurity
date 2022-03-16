package com.mkielar.notepadbsm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.mkielar.notepadbsm.model.Note
import com.mkielar.notepadbsm.model.Notes
import com.mkielar.notepadbsm.view.SharedPreferencesStorage

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}