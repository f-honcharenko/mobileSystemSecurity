package com.mkielar.notepadbsm.viewmodel

import androidx.lifecycle.ViewModel
import com.mkielar.notepadbsm.model.Note
import com.mkielar.notepadbsm.model.Notes
import com.mkielar.notepadbsm.view.StorageProvider
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.PBEKeySpec
import javax.crypto.spec.SecretKeySpec


class NotepadViewModel : ViewModel() {
    private lateinit var storageProvider: StorageProvider

    fun setStorageProvider(storageProvider: StorageProvider) {
        this.storageProvider = storageProvider
    }

    fun getNotes(): List<String> =
        storageProvider.read(NOTES_KEY, Notes::class.java)?.notes?.map { it.title } ?: emptyList()

    fun getNoteByTitle(title: String): Note? {
        return try {
            storageProvider.read(
                NOTES_KEY,
                Notes::class.java
            )?.notes?.first { it.title == title }
        } catch (e: NoSuchElementException) {
            null
        }
    }

    fun encryptAndSave(note: Note, content: String, password: String) {
        val random = SecureRandom()
        val salt = ByteArray(SALT_SIZE)
        random.nextBytes(salt)


        val key = calculateKey(password, salt)

        val cipher = Cipher.getInstance(TRANSFORMATION)
        val iv = ByteArray(cipher.blockSize)
        random.nextBytes(iv)
        val ivParams = IvParameterSpec(iv)
        cipher.init(Cipher.ENCRYPT_MODE, key, ivParams);
        val data = cipher.doFinal(content.toByteArray())

        val updated = note.copy(
            iv = iv,
            salt = salt,
            data = data
        )
        val notes = (storageProvider.read(NOTES_KEY, Notes::class.java)?.notes
            ?: emptyList()).filter { it.title != updated.title }.toMutableList()
        notes.add(updated)
        val updatedNotes = Notes(notes)

        storageProvider.write(NOTES_KEY, updatedNotes)
    }

    fun decryptNote(note: Note, password: String): String {
        val key = calculateKey(password, note.salt)

        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.DECRYPT_MODE, key, IvParameterSpec(note.iv))
        return String(cipher.doFinal(note.data))
    }

    private fun calculateKey(
        password: String,
        salt: ByteArray
    ): SecretKeySpec = SecretKeySpec(
        SecretKeyFactory.getInstance(ALGORITHM)
            .generateSecret(
                PBEKeySpec(
                    password.toCharArray(), salt,
                    ITERATIONS,
                    KEY_SIZE
                )
            )
            .encoded, KEY_SPEC
    )


    companion object {
        const val NOTES_KEY = "notes"
        const val TRANSFORMATION = "AES/CBC/PKCS5Padding"
        const val ALGORITHM = "PBKDF2WithHmacSHA1"
        const val KEY_SPEC = "AES"
        const val ITERATIONS = 10000
        const val KEY_SIZE = 256
        const val SALT_SIZE = KEY_SIZE / 8
    }

}