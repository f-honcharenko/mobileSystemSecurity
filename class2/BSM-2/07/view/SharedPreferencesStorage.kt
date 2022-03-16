package com.mkielar.notepadbsm.view

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.mkielar.notepadbsm.model.Notes

class SharedPreferencesStorage(context: Context) : StorageProvider {
    private val sharedPreferences = context.getSharedPreferences(context.packageName, Context.MODE_PRIVATE)

    override fun write(key: String, obj: Any) {
        sharedPreferences.edit()
            .putString(key, Gson().toJson(obj))
            .apply()
    }

    override fun <T> read(key: String, clazz: Class<T>): T? {
        return Gson().fromJson(sharedPreferences.getString(key, null), clazz)
    }
}