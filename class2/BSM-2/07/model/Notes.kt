package com.mkielar.notepadbsm.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Notes(
    val notes: List<Note>
) : Parcelable