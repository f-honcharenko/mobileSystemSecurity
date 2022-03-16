package com.mkielar.notepadbsm.view

import android.app.AlertDialog
import android.content.Context
import android.content.DialogInterface.OnShowListener
import android.os.Bundle
import android.text.InputFilter
import android.text.InputType
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.mkielar.notepadbsm.databinding.FragmentNotepadBinding
import com.mkielar.notepadbsm.model.Note
import com.mkielar.notepadbsm.viewmodel.NotepadViewModel


class FragmentNotepad : Fragment() {
    private lateinit var binding: FragmentNotepadBinding
    private val args: FragmentNotepadArgs by navArgs()
    private val viewModel: NotepadViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentNotepadBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        requireContext().let {
            context
            viewModel.setStorageProvider(SharedPreferencesStorage(requireContext()))

            val note = viewModel.getNoteByTitle(args.title)
            if (note != null) {
                val charPool : List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')
                binding.editor.hint = (1..note.data.size)
                    .map { i -> kotlin.random.Random.nextInt(0, charPool.size) }
                    .map(charPool::get)
                    .joinToString("")

                showDecryptDialog(it, note)
            }

            binding.save.setOnClickListener {
                val passwordEditText = EditText(context)

                passwordEditText.filters += InputFilter.LengthFilter(20)
                passwordEditText.inputType =
                    InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
                passwordEditText.hint = "Password"

                val dialog = AlertDialog.Builder(context)
                    .setTitle("Enter password")
                    .setView(passwordEditText)
                    .setPositiveButton("Encrypt", null)
                    .setCancelable(true)
                    .create()

                dialog.setOnShowListener {
                    val button = dialog.getButton(AlertDialog.BUTTON_POSITIVE)
                    button.setOnClickListener ButtonPositive@ {
                        val password = passwordEditText.text.toString()
                        if(password.length < 12) {
                            passwordEditText.error = "Password is too short"
                            return@ButtonPositive
                        }
                        if(!password.matches(".*[a-z].*".toRegex())) {
                            passwordEditText.error = "Password should contain lowercase letters"
                            return@ButtonPositive
                        }
                        if(!password.matches(".*[A-Z].*".toRegex())) {
                            passwordEditText.error = "Password should contain uppercase letters"
                            return@ButtonPositive
                        }
                        if(!password.matches(".*[0-9].*".toRegex())) {
                            passwordEditText.error = "Password should contain digits"
                            return@ButtonPositive
                        }

                        viewModel.encryptAndSave(
                            note ?: Note(args.title, ByteArray(0), ByteArray(0), ByteArray(0)),
                            binding.editor.text.toString(),
                            passwordEditText.text.toString()
                        )
                        findNavController().popBackStack()
                        dialog.dismiss()
                    }
                }
                dialog.show()
            }
        }
    }

    private fun showDecryptDialog(context: Context, note: Note) {
        val passwordEditText = EditText(context)

        passwordEditText.filters += InputFilter.LengthFilter(20)
        passwordEditText.inputType =
            InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        passwordEditText.hint = "Password"

        AlertDialog.Builder(context)
            .setTitle("Enter password")
            .setView(passwordEditText)
            .setPositiveButton("Decrypt") { dialog, whichButton ->
                try {
                    binding.editor.setText(
                        viewModel.decryptNote(
                            note,
                            passwordEditText.text.toString()
                        )
                    )
                } catch (e: Exception) {
                    Toast.makeText(context, "Invalid password", Toast.LENGTH_SHORT).show()
                    showDecryptDialog(context, note)
                }
            }
            .setCancelable(true)
            .setOnCancelListener{
                findNavController().popBackStack()
            }
            .show()
    }
}