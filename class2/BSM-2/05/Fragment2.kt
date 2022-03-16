package com.example.myapp01.ui.main

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.example.myapp01.MainApplication
import com.example.myapp01.R
import com.example.myapp01.databinding.Fragment2Binding
import com.example.myapp01.databinding.MainFragmentBinding
import com.example.myapp01.databinding.NoteFragmentBinding

class Fragment2: Fragment() {
    private var binding: Fragment2Binding? = null


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val fragmentBinding = Fragment2Binding.inflate(inflater, container, false)
        binding = fragmentBinding
        val context = MainApplication.applicationContext()
        // sprawdza czy użytkownik zdążył ustawić notatkę, jeśli nie - wyświetlane jest "Hello World!!!"
        var sharedPreferences = context.getSharedPreferences("NoteU", Context.MODE_PRIVATE)
        val note = sharedPreferences.getString("NoteU", "")
        if (note!!.length == 0) {

                val fragmentBinding = Fragment2Binding.inflate(inflater, container, false)

                binding!!.textView.text = "Hello World!!!"

        }
        else{
            binding!!.textView.text = note
        }
        return fragmentBinding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding?.apply {
          lifecycleOwner = viewLifecycleOwner
            //viewModel = sharedViewModel
            fragment = this@Fragment2
        }
    }
    fun change_pass(){
        findNavController().navigate(R.id.action_fragment2_to_passwordFragment)
    }
    fun log_out(){
        findNavController().navigate(R.id.action_fragment2_to_mainFragment)
    }
    fun change_note(){
        findNavController().navigate(R.id.action_fragment2_to_noteFragment)
    }
}