package com.mkielar.notepadbsm.view

import com.mkielar.notepadbsm.model.Notes

interface StorageProvider {
    fun write(key: String, obj: Any)
    fun <T> read(key: String, clazz: Class<T>): T?
}