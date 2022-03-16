package com.example.myapp01.ui.main

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.example.myapp01.MainApplication
import com.example.myapp01.R
import com.example.myapp01.databinding.MainFragmentBinding
import com.example.myapp01.databinding.NoteFragmentBinding
// fragment, który umożliwia wpisanie i zmiane notatki
class NoteFragment: Fragment() {

    private var binding: NoteFragmentBinding? = null


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val fragmentBinding = NoteFragmentBinding.inflate(inflater, container, false)
        binding = fragmentBinding
        return fragmentBinding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding?.apply {
           lifecycleOwner = viewLifecycleOwner
           // viewModel = sharedViewModel
            fragment = this@NoteFragment
        }
    }
    fun EditText.StringValue()= text.toString()
    fun save_note(){
        val context = MainApplication.applicationContext()
        var sharedPreferences = context.getSharedPreferences("NoteU", Context.MODE_PRIVATE)

        val editor: SharedPreferences.Editor = sharedPreferences.edit()

        editor.putString("NoteU", binding!!.editTextTextMultiLine.StringValue()).apply()

        findNavController().navigate(R.id.action_noteFragment_to_fragment2)

    }
}